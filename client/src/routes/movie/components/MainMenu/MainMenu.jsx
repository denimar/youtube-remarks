import React from 'react'
import './MainMenu.scss'
import AppContext from '../../../../layouts/App/AppContext'
import TreeView from 'deni-react-treeview'
import Icon from 'react-icons-kit'
import { trashO } from 'react-icons-kit/fa/trashO'
import { pencil } from 'react-icons-kit/fa/pencil'
import { plus } from 'react-icons-kit/fa/plus'
//import { folderPlus } from 'react-icons-kit/icomoon/folderPlus'
import { folderPlus } from 'react-icons-kit/feather/folderPlus'
import NewItemModal from './NewItemModal'
import MovieService from '../../MovieService'
import DeniDlg from 'deni-react-dialog'

class MainMenu extends React.Component {

  async onSelectItem(togleMainMenuFn, item) {
    if (item.isLeaf) {
      const movieObj = await MovieService.getMovie(item.id)
      const remarks = await MovieService.fetchMovieRemarks(item.id)
      this.props.selectCurrentMovieFn(item.id, movieObj.data, remarks.data)
      togleMainMenuFn()
    }
  }

  onRenderItem(context, item) {
    return (
      <div className="treeview-item-example">
        <span className="treeview-item-example-text">{item.text}</span>
        {
          item.isLeaf ? null : (
            <React.Fragment>
              <span className="actionButton plus" onClick={this.addItemClick.bind(this, item.id, context)}><Icon icon={plus} size={16} /></span>
              <span className="actionButton edit" onClick={this.editItemClick.bind(this)}><Icon icon={pencil} size={16} /></span>
            </React.Fragment>
          )
        }
        <span className="actionButton trash" onMouseDown={event => this.deleteItemClick.call(this, event, item)}><Icon icon={trashO} size={16} /></span>
      </div>
    )
  }

  async deleteItemClick(event, item) {
    event.stopPropagation()
    DeniDlg.confirm('Are you sure?').then(async responseData => {
      if (responseData.button === 'yes') {
        const deleteFn = item.isLeaf ? MovieService.deleteMovie : MovieService.deleteFolder
        const resp = await deleteFn(item.id)
        if (resp.data.found) {
          DeniDlg.ghost('Item deleted successfully.')
          this.treeview.api.removeItem(item.id)
        }
      }
    })
  }

  addItemClick(id, context) {
    this.addNewItem.call(this, id, context)
  }

  editItemClick(id) {
    console.log('edit')
    //alert('editing routine here...')
  }

  fetchMovies() {

  }

  addNewItem(parentFolderId, context) {
    const _self = this
    const modal = new NewItemModal(parentFolderId, (type, addedItem) => {
      const treeItemText = type === 0 ? addedItem.title : addedItem.snippet.title
      const selectedItem = _self.treeview.api.getSelectedItem()
      const parentNode = parentFolderId ? selectedItem : _self.treeview.api.getRootItem()
      const newItem = _self.treeview.api.addItem(treeItemText, type === 1, parentNode)
      newItem.id = addedItem.id
      if (type === 1) { //item
        _self.onSelectItem(context.togleMainMenu, newItem)
      }
      _self.forceUpdate()
    })
    modal.show();
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div className={'main-menu-container' + (context.showMainMenu ? ' show-menu' : '')}>
            <div className="main-menu-header">
              <div>
                <span>Movies</span>
                <Icon icon={folderPlus} size={18} onClick={this.addNewItem.bind(this, null, context)} />
              </div>
            </div>
            <div className="main-menu-body">
              {
                this.props.movies.length > 0 ? (
                  <TreeView
                    ref={elem => this.treeview = elem}
                    items={this.props.movies}
                    onSelectItem={this.onSelectItem.bind(this, context.togleMainMenu)}
                    selectRow={true}
                    onRenderItem={this.onRenderItem.bind(this, context)}
                  />
                ) : null
              }
            </div>
          </div>
        )}
      </AppContext.Consumer>
    )
  }

}

export default MainMenu