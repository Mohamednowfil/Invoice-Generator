import React from "react";

const ItemList = ({ items, newItem, setNewItem, addItem, deleteItem }) => {
  return (
    <div>
      <h3>Items</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>
              {item.description} - {item.quantity} x ${item.price.toFixed(2)}
            </span>
            <button className="delete" onClick={() => deleteItem(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default ItemList;
