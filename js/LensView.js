import ComponentView from 'core/js/views/componentView';

class LensView extends ComponentView {
  preRender() {
    this.onChange = this.onChange.bind(this);
    this.model.toggleItemsState(0);
  }

  postRender() {
    this.$('.component__widget').imageready(() => {
      this.setReadyStatus();
    });
    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  onChange(event) {
    this.model.toggleItemsState(Number(event.target.value));
  }
}

LensView.template = 'lens.jsx';

export default LensView;
