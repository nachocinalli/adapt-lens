import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class LensModel extends ItemsComponentModel {

  toggleItemsState(index) {
    const item = this.getItem(index);
    const previousActiveItem = this.getActiveItem();

    item.toggleActive();
    item.toggleVisited(true);

    if (!previousActiveItem) return;
    previousActiveItem.toggleActive(false);
  }
}
