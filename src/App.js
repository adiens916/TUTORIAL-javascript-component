import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAdder from "./components/ItemAdder.js";
import ItemFilter from "./components/ItemFilter.js";
import { FILTER_MODE } from "./components/ItemFilter.js";

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
      filterMode: FILTER_MODE.all,
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
      <div data-component="ItemFilter"></div>
    `;
  }

  mounted() {
    console.log("App mount");
    const $itemAdder = this.$target.querySelector(
      '[data-component="ItemAdder"]'
    );
    new ItemAdder($itemAdder, {
      addItem: this.addItem.bind(this),
    });

    const $items = this.$target.querySelector('[data-component="Items"]');
    new Items($items, {
      items: this.filteredItems,
      toggleItem: this.toggleItemActivity.bind(this),
      deleteItem: this.deleteItem.bind(this),
    });

    const $itemFilter = this.$target.querySelector(
      '[data-component="ItemFilter"]'
    );
    new ItemFilter($itemFilter, {
      filterItem: this.filterItem.bind(this),
    });
  }

  get filteredItems() {
    const { filterMode, items } = this.$state;
    return items.filter(({ active }) => {
      switch (filterMode) {
        case FILTER_MODE.activeOnly:
          return active;
        case FILTER_MODE.inactiveOnly:
          return !active;
        default:
          return true;
      }
    });
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((item) => item.seq)) + 1;

    this.setState({
      items: [...items, { seq, contents, active: false }],
    });
  }

  toggleItemActivity(seq) {
    const items = [...this.$state.items];

    const index = items.findIndex((item) => item.seq === seq);
    items[index].active = !items[index].active;

    this.setState({ items });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    this.setState({
      items: items.filter((item) => item.seq !== seq),
    });
  }

  filterItem(filterMode) {
    this.setState({ filterMode });
  }
}
