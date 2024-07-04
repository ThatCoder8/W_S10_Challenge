// import React from 'react'
// import { useGetUsersQuery, } from '../state/store'
// import { useDispatch, useSelector } from 'react-redux'
// import { setFilter } from '../state/store'

// export default function OrderList() {
//   const { data: users, error, isLoading } = useGetUsersQuery();
//   const dispatch = useDispatch()
//   const filter = useSelector((state) => state.filter)

//   const handleFilterChange = (newFilter) => {
//     dispatch(setFilter(newFilter))
//   };

//   const filteredUsers = users?.filter(user => filter === 'All' || user.size === filter)

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading users</div>

//   return (
//     <div id="orderList">
//       <h2>Pizza Orders</h2>
//       <ol>
//         {
//          filteredOrders?.map(order => (
//               <li key={order.id}>
//                 <div>
//                   {order.fullName} - {order.size} - {order.toppings.join(',')}order details here
//                 </div>
//               </li>
//             ))
//         }
//       </ol>
//       <div id="sizeFilters">
//         Filter by size:
//         {
//           ['All', 'S', 'M', 'L'].map(size => {
//             const isActive = size === filter
//             const className = `button-filter${isActive ? 'active' : ''}`
//             return <button
//               data-testid={`filterBtn${size}`}
//               className={className}
//               key={size}
//               onClick={() => handleFilterChange(size)}>{size}</button>
//           })
//         }
//       </div>
//     </div>
//   )
// }

import React from 'react';
import { useGetPizzaHistoryQuery } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../state/store';

export default function OrderList() {
  const { data: orders } = useGetPizzaHistoryQuery();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const filteredOrders = orders?.filter(order => filter === 'All' || order.size === filter);

  // Commented out the loading and error states for testing purposes
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading orders</div>;

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
      {
          filteredOrders?.map(order => {
            const toppingsCount = order.toppings.length;
            let toppingsText = 'no toppings';
            if (toppingsCount === 1) {
              toppingsText = '1 topping';
            } else if (toppingsCount > 1) {
              toppingsText = `${toppingsCount} toppings`;
            }
            return (
              <li key={order.id}>
                <div>
                  {order.fullName} ordered a size {order.size} with {toppingsText}
                </div>
              </li>
            );
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const isActive = size === filter;
            const className = `button-filter${isActive ? ' active' : ''}`;
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => handleFilterChange(size)}>{size}</button>
          })
        }
      </div>
    </div>
  );
}
