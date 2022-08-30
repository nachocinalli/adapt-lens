import Adapt from 'core/js/adapt';
import React from 'react';
import a11y from 'core/js/a11y';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Lens (props) {
  const visited = Adapt.course.get('_globals')?._accessibility?._ariaLabels.visited;
  const {
    _id,
    _graphic,
    itemsLegend,
    _items,
    _ariaLevel,
    onChange
  } = props;
  const itemAriaLevel = _.isNumber(_ariaLevel) ? _ariaLevel + 1 : _ariaLevel;
  const itemActive = _items.find(item => item._isActive);

  return (
    <div className="component__inner lens__inner">

      <templates.header {...props} />

      <div className="component__widget lens__widget">
        <div className="lens__graphic" style={{
          backgroundImage: `url(${_graphic.src})`,
          aspectRatio: _graphic.aspectRatio,
          backgroundPosition: itemActive?.backgroundPosition,
          backgroundSize: itemActive?.backgroundSize
        }}
        role="img" aria-label={_graphic.alt}></div>
        <fieldset className="lens__items">
          <legend dangerouslySetInnerHTML={{ __html: compile(itemsLegend) }}></legend>
          {_items.map(({ title, _index, _isVisited, _isActive, _ariaLevel }, index) =>
            <div className={classes([
              'lens__item',
              'js-lens-item',
              _isVisited && 'is-visited',
              _isActive ? 'is-selected' : ''
            ])}
            key={_index}
            data-index={_index}
            role="heading"
            aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem', override: _ariaLevel ?? itemAriaLevel })} >
              <input onChange={onChange} type="radio" id={`${_id}-${index}-lens-input`} name={`${_id}-lens-inputs`} value={_index} checked={_isActive} readOnly></input>
              <label aria-label={`${_isVisited ? visited + '. ' : ''}${compile(title)}`} htmlFor={`${_id}-${index}-lens-input`} dangerouslySetInnerHTML={{ __html: compile(title) }}></label>
            </div>
          )}
        </fieldset>
      </div>

    </div>
  );
}
