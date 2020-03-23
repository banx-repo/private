"use strict";

const products = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7"
  }
];

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form action="">
        <input
          type="text"
          placeholder="Search..."
          value={this.props.searchText}
          onChange={e => this.props.handleSearchTextChange(e.target.value)}
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={this.props.stockOnly}
            onChange={e => this.props.handleStockOnlyChange(e.target.checked)}
          />{" "}
          Only show products in stock
        </label>
      </form>
    );
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const searchText = this.props.searchText.trim().toLowerCase();
    const stockOnly = this.props.stockOnly;
    const stocked = this.props.product.stocked;
    const name = this.props.product.name;
    const price = this.props.product.price;

    return (
      <tr
        className={
          (stocked ? "inStock" : "outStock") +
          ((stockOnly && !stocked) || !name.toLowerCase().includes(searchText)
            ? " hidden"
            : "")
        }
      >
        <td>{name}</td>
        <td>{price}</td>
      </tr>
    );
  }
}

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const searchText = this.props.searchText;
    const stockOnly = this.props.stockOnly;

    const filterCategory = this.props.products.filter(
      ({ category }) => category === this.props.category
    );

    const products = filterCategory.map(i => (
      <Product searchText={searchText} stockOnly={stockOnly} product={i} />
    ));

    return (
      <React.Fragment>
        <tr>
          <th colspan="2">{this.props.category}</th>
        </tr>
        {products}
      </React.Fragment>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const category = [...new Set(products.map(i => i.category))];
    const data = category.map(i => (
      <Category
        searchText={this.props.searchText}
        stockOnly={this.props.stockOnly}
        category={i}
        products={this.props.products}
      />
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      stockOnly: false
    };
  }

  handleSearchTextChange = searchText => this.setState({ searchText });

  handleStockOnlyChange = stockOnly => this.setState({ stockOnly });

  render() {
    return (
      <div id="app">
        <h2>Searchable Products Table</h2>
        <p>(Powered by React and Babel)</p>
        <SearchBox
          searchText={this.state.searchText}
          stockOnly={this.state.stockOnly}
          handleSearchTextChange={this.handleSearchTextChange}
          handleStockOnlyChange={this.handleStockOnlyChange}
        />
        <ProductTable
          searchText={this.state.searchText}
          stockOnly={this.state.stockOnly}
          products={products}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.body);
