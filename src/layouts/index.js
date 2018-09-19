import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { concat, compose, equals, filter, map, not, take, takeLast, unnest } from 'ramda'
import { mergeProp } from 'ramda-adjunct'

import Header from '../components/header'
import BookList from '../components/booklist'
import Search from '../components/search'
import './index.css'

// List names
const BookLists = {
    toReadList: { id: 'toReadList', heading: 'To Be Read' },
    readingList: { id: 'readingList', heading: 'Currently Reading' },
    readList: { id: 'readList', heading: 'Done Reading' }
}

// List filters
const bookToRead = (book) => book.status.id === BookLists.toReadList.id
const bookReading = (book) => book.status.id === BookLists.readingList.id
const bookRead = (book) => book.status.id === BookLists.readList.id

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [
        {
          id: 'to-kill-a-mockingbird',
          title: 'To Kill A Mockingbird',
          author: 'Harper Lee',
          description: 'Blah blah blah',
          rating: 5,
          status: BookLists.toReadList,
          img: { url: '', alt: '' }
        },
        {
          id: 'slaugherhouse-five',
          title: 'Slaughterhouse Five',
          author: 'Kurt Vonnegut',
          description: 'Blah blah blah',
          rating: 5,
          status: BookLists.toReadList,
          img: { url: '', alt: '' }
        },
        {
          id: 'the-lord-of-the-rings',
          title: 'The Lord of the Rings',
          author: 'Tolkein',
          description: 'Blah blah blah',
          rating: 5,
          status: BookLists.toReadList,
          img: { url: '', alt: '' }
        }
      ]
    }

    // Binding 'this' scope onto class properties
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addBook = this.addBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }

  // onDragEnd() is called when the list item's dragging event is complete.
  // Please note: most of the code in this method uses functions from
  // the Ramda.js library as I felt the functional composition
  // complimented react quite nicely!
  onDragEnd = (result) => {
    // If dragged outside of area, then return false
    if (!result.destination) {
      return false;
    }

    // Capturing draggable properties to local vars for brevity
    const destId = result.destination.droppableId
    const destIndex = result.destination.index

    // Capturing book list ids to local vars for brevity
    const toReadListId = BookLists.toReadList.id
    const readingListId = BookLists.readingList.id
    const readListId = BookLists.readList.id

    // Comparison function to match the dragged book
    const bookMatch = book => equals(book.id, result.draggableId)

    // The book currently being dragged
    const selectedBook = filter(bookMatch, this.state.books)

    // Filtering out selected book from book list
    const filteredBookList = filter(compose(not, bookMatch), this.state.books)

    // Separating out books into their category lists to help with reordering
    const booksToRead = filter(bookToRead, filteredBookList)
    const booksReading = filter(bookReading, filteredBookList)
    const booksRead = filter(bookRead, filteredBookList)

    // These slice functions will create two halves of lists at a given index
    const sliceFirst = (i, list) => take(i, list)
    const sliceLast = (i, list) => takeLast(list.length - i, list)

    // Inject the transformed selectedBook if the destination id
    // of the draggable item (book) matches the list's id
    const condInject = (listId, list) => {
      return equals(destId, listId) ?
        unnest([
          sliceFirst(destIndex, list),
          map(mergeProp('status', BookLists[destId]), selectedBook),
          sliceLast(destIndex, list)
        ]) :
        list
    }

    // Rejoin all of the lists in order!
    const books = unnest([
      condInject(toReadListId, booksToRead),
      condInject(readingListId, booksReading),
      condInject(readListId, booksRead)
    ])

    this.setState({
      books
    })
  }

  addBook = (book) => {
    const books = concat(this.state.books, Array.of(book))
    this.setState ({
      books
    })
  }

  deleteBook = (book) => {
    const books = this.state.books.filter(b => b.id !== book.id)
    this.setState ({
      books
    })
  }

  render() {
    console.log(this.state)
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}>

        <Helmet title={this.props.data.site.siteMetadata.title}
          meta={[{
                  name: 'description',
                  content: 'MyReads - Udacity Project'
                },
                {
                  name: 'keywords',
                  content: 'myreads, book, library, udacity, frontend nanodegree'
                }]}/>

        <Header siteTitle={this.props.data.site.siteMetadata.title}/>

        <div className='flex-container'>
          {/* List of books to be read */}
          <BookList heading={BookLists.toReadList.heading}
                    id={BookLists.toReadList.id}
                    books={this.state.books}
                    filter={bookToRead}
                    addBook={this.addBook}
                    deleteBook={this.deleteBook}>
          </BookList>

          {/* List of books currently being read */}
          <BookList heading={BookLists.readingList.heading}
                    id={BookLists.readingList.id}
                    books={this.state.books}
                    filter={bookReading}
                    addBook={this.addBook}
                    deleteBook={this.deleteBook}>
          </BookList>

          {/* List of books that have been read */}
          <BookList heading={BookLists.readList.heading}
                    id={BookLists.readList.id}
                    books={this.state.books}
                    filter={bookRead}
                    addBook={this.addBook}
                    deleteBook={this.deleteBook}>
          </BookList>
        </div>

        {/* Leave props.children() here, this is passed from the page. */}
        {this.props.children()}
      </DragDropContext>)
  }
}

export default Layout

export const query = graphql `
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
