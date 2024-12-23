import React, { useState } from "react";
import jsPDF from "jspdf";
import CustomerDetails from "./CustomerDetails";
import ItemList from "./ItemList";
import "../App.css";

const InvoiceGenerator = () => {
  const [fromDetails, setFromDetails] = useState({ name: "", email: "", address: "" });
  const [toDetails, setToDetails] = useState({ name: "", email: "", address: "" });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ description: "", quantity: 0, price: 0 });
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxType, setTaxType] = useState("percentage");
  const [discountType, setDiscountType] = useState("percentage");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.price > 0) {
      setItems([...items, newItem]);
      setNewItem({ description: "", quantity: 0, price: 0 });
    } else {
      alert("Please enter valid item details.");
    }
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount =
      taxType === "percentage" ? (subtotal * tax) / 100 : parseFloat(tax);
    const discountAmount =
      discountType === "percentage" ? (subtotal * discount) / 100 : parseFloat(discount);

    return subtotal + taxAmount - discountAmount;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const subtotal = calculateSubtotal();
    const total = calculateTotal();

    doc.text("Invoice", 20, 20);

    doc.text("From:", 20, 30);
    doc.text(`${fromDetails.name}`, 20, 40);
    doc.text(`${fromDetails.email}`, 20, 50);
    doc.text(`${fromDetails.address}`, 20, 60);

    doc.text("To:", 120, 30);
    doc.text(`${toDetails.name}`, 120, 40);
    doc.text(`${toDetails.email}`, 120, 50);
    doc.text(`${toDetails.address}`, 120, 60);

    let y = 80;
    doc.text("Items:", 20, y);
    items.forEach((item, index) => {
      y += 10;
      doc.text(
        `${index + 1}. ${item.description} - ${item.quantity} x $${item.price} = $${(item.quantity * item.price).toFixed(2)}`,
        20,
        y
      );
    });

    y += 20;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, y);
    y += 10;
    doc.text(`Tax (${taxType}): $${tax}`, 20, y);
    y += 10;
    doc.text(`Discount (${discountType}): $${discount}`, 20, y);
    y += 10;
    doc.text(`Total: $${total.toFixed(2)}`, 20, y);

    doc.save("invoice.pdf");
  };

  return (
    <div className="container">
      <h2>Invoice Generator</h2>
      <CustomerDetails label="From" details={fromDetails} setDetails={setFromDetails} />
      <CustomerDetails label="To" details={toDetails} setDetails={setToDetails} />
      <ItemList
        items={items}
        newItem={newItem}
        setNewItem={setNewItem}
        addItem={addItem}
        deleteItem={deleteItem}
      />
      <div className="tax-discount-section">
        <div>
          <h3>Tax</h3>
          <div>
            <label>
              <input
                type="radio"
                value="percentage"
                checked={taxType === "percentage"}
                onChange={(e) => setTaxType(e.target.value)}
              />
              Percentage (%)
            </label>
            <label>
              <input
                type="radio"
                value="fixed"
                checked={taxType === "fixed"}
                onChange={(e) => setTaxType(e.target.value)}
              />
              Fixed ($)
            </label>
          </div>
          <input
            type="number"
            placeholder={taxType === "percentage" ? "Enter tax %" : "Enter tax $"}
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <h3>Discount</h3>
          <div>
            <label>
              <input
                type="radio"
                value="percentage"
                checked={discountType === "percentage"}
                onChange={(e) => setDiscountType(e.target.value)}
              />
              Percentage (%)
            </label>
            <label>
              <input
                type="radio"
                value="fixed"
                checked={discountType === "fixed"}
                onChange={(e) => setDiscountType(e.target.value)}
              />
              Fixed ($)
            </label>
          </div>
          <input
            type="number"
            placeholder={discountType === "percentage" ? "Enter discount %" : "Enter discount $"}
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button onClick={() => setIsPreviewOpen(true)} style={{ marginTop: "20px" }}>
        Preview Invoice
      </button>

      {isPreviewOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Invoice Preview</h3>
            <p><strong>From:</strong> {fromDetails.name}, {fromDetails.email}, {fromDetails.address}</p>
            <p><strong>To:</strong> {toDetails.name}, {toDetails.email}, {toDetails.address}</p>
            <h4>Items</h4>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.description} - {item.quantity} x ${item.price.toFixed(2)} = ${(
                    item.quantity * item.price
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
            <p><strong>Subtotal:</strong> ${calculateSubtotal().toFixed(2)}</p>
            <p><strong>Tax:</strong> ${taxType === "percentage" ? `${tax}%` : `$${tax}`}</p>
            <p><strong>Discount:</strong> ${discountType === "percentage" ? `${discount}%` : `$${discount}`}</p>
            <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
            <button onClick={generatePDF}>Generate Invoice</button>
            <button onClick={() => setIsPreviewOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;