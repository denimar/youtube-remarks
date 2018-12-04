import React from 'react'
import { DeniReactModal, Button } from 'deni-react-modal'
import './NewItemModal.scss'
import NewItemModalBody from './NewItemModalBody'
import MovieService from '../../../MovieService'

class NewItemModal extends DeniReactModal {

  constructor(parentFolderId, callbackFn) {
    super()
    this.parentFolderId = parentFolderId
    this.callbackFn = callbackFn
  }

  async modalConfirm(modalBody, button) {
    if (button === Button.OK) {
      let type = this.NewItemModalBodyElem.getType()
      let folderNameOrMovieId = this.NewItemModalBodyElem.getFolderNameOrMovieId()

      if (folderNameOrMovieId) {
        let addedItem
        const methodAddFn = type === 0 ? MovieService.addFolder : MovieService.addMovie
        addedItem = await methodAddFn(this.parentFolderId, folderNameOrMovieId)

        if (type === 0) {
          addedItem.data['title'] = folderNameOrMovieId
        }
        const _self = this
        setTimeout(async () => {
          _self.callbackFn(type, addedItem.data, folderNameOrMovieId)
        }, 1000)
        return true
      }
      this.NewItemModalBodyElem.initFocus()
      return false
    }
    return true;
  }

  getConfig() {
    return {
      title: 'Adding new folder/item',
      width: '550px',
      buttons: [
        Button.CANCEL,
        Button.OK
      ]
    }
  }

  render() {
    return (
      <div className="new-item-modal-container">
        <NewItemModalBody ref={elem => this.NewItemModalBodyElem = elem} />
      </div>
    )
  }

}

export default NewItemModal