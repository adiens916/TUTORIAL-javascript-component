import Component from "../core/Component.js";

export default class ItemAdder extends Component {
  template() {
    return `
      <input 
        type="text" 
        class="adder" 
        placeholder="아이템 내용 입력"
      />
    `;
  }

  setEvent() {
    this.addEvent(".adder", "keyup", ({ key, target }) => {
      if (key !== "Enter") return;
      this.$props.addItem(target.value);
    });
  }
}
