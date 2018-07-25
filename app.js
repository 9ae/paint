const state = {
    colors: {},
    current: {
      studio: {
        hex: 'c1e4e4',
        code: 'BM 2049-60',
        name: 'Forget Me Not'
      },
      kitchen: {
        hex: 'b97551',
        code: '',
        name: ''
      },
      accent: {
        hex: 'f9f2de',
        code: '',
        name: ''
      }
    },
    saved: []
};

//views
const colorControl = (colorKey, colorObj) => {
    return `<div class="color-group" style="background-color:${colorObj.hex}"><label>${colorKey}</label>
      <input type="text"
        id="${colorKey}_hex"
        onChange="app.run('updateHex', '${colorKey}', this.value)"
        placeholder="hex" value="${colorObj.hex}" />
      <input type="text" id="${colorKey}_code" placeholder="code" value="${colorObj.code}" />
      <input type="text" id="${colorKey}_name" placeholder="name" value="${colorObj.name}" />
    </div>`
}

const view = state => {
  const layout = `<div class="center-wall studio"
  style="background-color: ${state.current.studio.hex}; border-bottom-color: ${state.current.accent.hex}">
    <div class="window" style="border-color: ${state.current.kitchen.hex}">&nbsp;</div>
  </div>
  <div class="hall" style="border-bottom-color: ${state.current.accent.hex}">
    <div class="wall studio" style="background-color: ${state.current.studio.hex}">&nbsp;</div>
    <div class="wall kitchen" style="background-color: ${state.current.kitchen.hex}">&nbsp;</div>
  </div>`

  const colorKeys = Object.keys(state.current)
  const controls = colorKeys.map(key => colorControl(key, state.current[key]))
  return layout + `<div class="controls">${controls.join('')}</div>`;
};
const update = {
  'updateHex': (state, colorKey, value)  => {
    const nc = state.current;
    nc[colorKey]['hex'] = value;
    return { ...state,
      current: nc
    }
  },
  'otherEvt': (state, val) => {
    console.log(val);
    return state;
  }
};
app.start('apt', state, view, update);
