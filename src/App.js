import Component from "./core/Component.js";
import Items from "./components/Items.js";

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
      <div data-component="Items"></div>
    `;
  }

  mounted() {
    console.log("App mount");
    const $items = this.$target.querySelector('[data-component="Items"]');

    new Items($items, {
      items: this.$state.items,
      addItem: this.addItem.bind(this),
      deleteItem: this.deleteItem.bind(this),
    });
  }

  addItem() {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((item) => item.seq)) + 1;
    const contents = `item${seq}`;

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
