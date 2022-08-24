import Component from "../core/Component.js";

export const FILTER_MODE = {
  all: "all",
  activeOnly: "activeOnly",
  inactiveOnly: "inactiveOnly",
};

export default class ItemFilter extends Component {
  template() {
    return `
      <button 
        class="filterButton" 
        data-filter-mode="${FILTER_MODE.all}"
      >
        전체 보기
      </button>
      <button 
        class="filterButton" 
        data-filter-mode="${FILTER_MODE.activeOnly}"
      >
        활성 보기
      </button>
      <button 
        class="filterButton" 
        data-filter-mode="${FILTER_MODE.inactiveOnly}"
      >
        비활성 보기
      </button>
    `;
  }

  setEvent() {
    this.addEvent(".filterButton", "click", ({ target }) => {
      this.$props.filterItem(target.dataset.filterMode);
    });
  }
}
