import React, { Component } from 'react'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContatc: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  clearQuery = () => {
    this.setState({ query: ''})
  }

  render() {
    const { contacts, onDeleteContatc } = this.props
    const { query } = this.state

//comment

    let showingContacts
    if (query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))

    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        {JSON.stringify(this.state)}
        <div className='list-contact-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contatcs'>
            <span>Now showing {showingContacts.length} of {contacts.length} total!</span>
          <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`}}/>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button onClick={() => onDeleteContatc(contact)} className="contact-remove">
                  Remove
                </button>

              </li>
            ))}
          </ol>

      </div>
      )

  }
}

// class ListContacts extends Component {
//   render() {
//     console.log('Props', this.props)
//     return (
//       <ol className='contact-list'>
//         {this.props.contacts.map((contact) => (
//           <li key={contact.id} className='contact-list-item'>
//             <div className="contact-avatar" style={{
//               backgroundImage: `url(${contact.avatarURL})`}}/>
//             <div className='contact-details'>
//               <p>{contact.name}</p>
//               <p>{contact.email}</p>
//             </div>
//             <button className="contact-remove">
//               Remove
//             </button>
//
//            </li>
//         ))}
//       </ol>
//     )
//   }
// }

// ListContacts.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContatc: PropTypes.func.isRequired
// }

export default ListContacts
