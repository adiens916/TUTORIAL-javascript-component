import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAdder from "./components/ItemAdder.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {
  setup() {
    console.log("App setup");

    /**
     * @type {{
     *  filterMode: number,
     *  items: {
     *    seq: number,
     *    contents: string,
     *    active: boolean
     *  }[]
     * }}
     */
    this.$state = {
      filterMode: 0,
      items: [
        {
          seq: 1,
          contents: "item1",
          active: false,
        },
        {
          seq: 2,
          contents: "item2",
          active: true,
        },
      ],
    };
  }

  template() {
    console.log("App template");
    return `
      <div data-component="ItemAdder"></div>
      <div data-component="Items"></div>
    `;
  }

  mounted() {
    console.log("App mount");
    const $items = this.$target.querySelector('[data-component="Items"]');
    const $itemAdder = this.$target.querySelector(
      '[data-component="ItemAdder"]'
    );

    new ItemAdder($itemAdder, {
      addItem: this.addItem.bind(this),
    });
    new Items($items, {
      items: this.$state.items,
      deleteItem: this.deleteItem.bind(this),
    });
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((item) => item.seq)) + 1;

    this.setState({
      items: [...items, { seq, contents, active: false }],
    });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    this.setState({
      items: items.filter((item) => item.seq !== seq),
    });
  }
}
