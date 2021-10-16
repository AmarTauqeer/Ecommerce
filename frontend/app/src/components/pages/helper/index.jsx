export const searchCategory = (searchText, data) => {
  let filterData = [];
  if (typeof searchText !== "undefined") {
    filterData = data.filter((x) =>
      x.category_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  return filterData;
};

export const searchProduct = (searchText, data) => {
  let filterData = [];
  if (typeof searchText !== "undefined") {
    filterData = data.filter((x) =>
      x.product_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  return filterData;
};

export const searchCustomer = (searchText, data) => {
  let filterData = [];
  if (typeof searchText !== "undefined") {
    filterData = data.filter((x) =>
      x.customer_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  return filterData;
};
