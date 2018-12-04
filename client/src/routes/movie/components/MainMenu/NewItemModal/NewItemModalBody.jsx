import React from 'react'

class NewItemModalBody extends React.Component {

  constructor() {
    super()
    this.state = { currentCheckedIndex: 0 }
  }

  componentDidMount() {
    this.initFocus()
  }

  selectTypeOptionClick(currentCheckedIndex) {
    this.setState({ currentCheckedIndex })
    this.initFocus()
  }

  initFocus() {
    const nameInput = document.querySelector('.new-item-modal-container .name-input')
    nameInput.focus()
  }

  getFolderNameOrMovieId() {
    return this.folderNameOrMovieIdInput.value.trim()
  }

  getType() {
    return this.state.currentCheckedIndex
  }

  render() {
    return (
      <fieldset>
        <legend>Item informations</legend>

        <div className="type-field-container">
          <label>Type:</label>
          <div onClick={this.selectTypeOptionClick.bind(this, 0)}>
            <input
              type="radio"
              name="type"
              value={0}
              checked={this.state.currentCheckedIndex === 0}
            />
            <span>Folder</span>
          </div>
          <div onClick={this.selectTypeOptionClick.bind(this, 1)}>
            <input
              type="radio"
              name="type"
              value={0}
              checked={this.state.currentCheckedIndex === 1}
            />
            <span>Item</span>
          </div>
        </div>

        <label>{this.state.currentCheckedIndex === 0 ? 'Folder Name:' : 'Youtube movie id:'}</label>
        <input
          ref={elem => this.folderNameOrMovieIdInput = elem}
          className="name-input"
          type="text"
          autoFocus
        />
      </fieldset>
    )
  }

}

export default NewItemModalBody