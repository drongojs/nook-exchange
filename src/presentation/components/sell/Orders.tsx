import React from 'react';

const Orders = () => {
  return (
    <div>
      <div>
        <a href="/sell/catalogue">Update my catalogue</a>
      </div>
      <h2>Orders</h2>
      <ul>
        <li>
          <div>Table</div>
          <div>Bobby - Bah Island</div>
          <div>{(new Date()).toLocaleString()}</div>
          <div>
            <select>
              <option value="requested">Requested</option>
              <option value="ordered">Ordered</option>
              <option value="crafting">Crafting</option>
              <option value="ready">Ready!</option>
              <option value="unavailable">Unavailable</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Orders;
