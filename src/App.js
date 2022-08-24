import Component from "./core/Component.js";
import Items from "./components/Items.js";

export default class App extends Component {
  setup() {
    console.log("App setup");
    this.$state = {
      items: ["item1", "item2", "item3"],
    };
  }

  template() {
    console.log("App template");
    return `
      <div data-component="Items"></div>
    `;
  }

  mounted() {
    console.log("App mount");
    const $items = this.$target.querySelector('[data-component="Items"]');

    new Items($items, {
      items: this.$state.items,
      addItem: this.addItem.bind(this),
    });
  }

  addItem() {
    const { items } = this.$state;
    this.setState({ items: [...items, `item${items.length + 1}`] });
  }
}
