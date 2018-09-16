import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Header from '../components/header'
import Bookshelf from '../components/bookshelf'
import Shelf from '../components/shelf'
import Book from '../components/book'
import Search from '../components/search'
import './index.css'

// List names
const BookLists = {
    toReadList: { id: 'toReadList', order: 0, heading: 'To Be Read' },
    readingList: { id: 'readingList', order: 1, heading: 'Currently Reading' },
    readList: { id: 'readList', order: 2, heading: 'Done Reading' }
}

// List filters
const bookToRead = (book) => book.status.id === BookLists.toReadList.id
const bookReading = (book) => book.status.id === BookLists.readingList.id
const bookRead = (book) => book.status.id === BookLists.readList.id

// List sort
const bookSort = (a, b) => (a.status.order - b.status.order || a.order - b.order)

class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [
        {
          order: 0,
          id: 'to-kill-a-mockingbird',
          title: 'To Kill A Mockingbird',
          author: 'Harper Lee',
          description: 'Blah blah blah',
          rating: 5,
          status: BookLists.toReadList,
          img: { url: '', alt: '' }
        },
        {
          order: 1,
          id: 'slaugherhouse-five',
          title: 'Slaughterhouse Five',
          author: 'Kurt Vonnegut',
          description: 'Blah blah blah',
          rating: 5,
          status: BookLists.toReadList,
          img: { url: '', alt: '' }
        },
        {
          order: 2,
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
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return false;
    }

    console.log(result);

    const books = this.state.books.map((book) => {
      if (book.id === result.draggableId) {
        return (
          {
            order: result.destination.index,
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            rating: book.rating,
            status: BookLists[result.destination.droppableId],
            img: book.img
          }
        )
      }
      else {
        return book
      }
    }).sort(bookSort)

    this.setState({
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
          <div className='book-list-wrapper'>
            <div><h2>{BookLists.toReadList.heading}</h2></div>
            <Droppable droppableId={BookLists.toReadList.id}>
              {(provided, snapshot) => (
                <div className='book-list'
                  ref={provided.innerRef}
                  {...provided.droppableProps}>

                  {this.state.books
                    .filter(bookToRead)
                    .map((book, index) => (
                      <Draggable draggableId={book.id} index={index} key={book.id}>
                        {(provided, snapshot) => (
                          <div
                            className='book'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={book.id}>
                            <h4>{book.title}</h4>
                            <p>index: {index}</p>
                            <p>id: {book.id}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* List of books currently being read */}
          <div className='book-list-wrapper'>
            <div><h2>{BookLists.readingList.heading}</h2></div>
            <Droppable droppableId={BookLists.readingList.id}>
              {(provided, snapshot) => (
                <div className='book-list'
                  ref={provided.innerRef}
                  {...provided.droppableProps}>

                  {this.state.books
                    .filter(bookReading)
                    .map((book, index) => (
                      <Draggable draggableId={book.id} index={index} key={book.id}>
                        {(provided, snapshot) => (
                          <div
                            className='book'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={book.id}>
                            <h4>{book.title}</h4>
                            <p>index: {index}</p>
                            <p>id: {book.id}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
              )}
            </Droppable>
          </div>

          {/* List of books that have been read */}
          <div className='book-list-wrapper'>
            <div><h2>{BookLists.readList.heading}</h2></div>
            <Droppable droppableId={BookLists.readList.id}>
              {(provided, snapshot) => (
                <div className='book-list'
                  ref={provided.innerRef}
                  {...provided.droppableProps}>

                  {this.state.books
                    .filter(bookRead)
                    .map((book, index) => (
                      <Draggable draggableId={book.id} index={index} key={book.id}>
                        {(provided, snapshot) => (
                          <div
                            className='book'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={book.id}>
                            <h4>{book.title}</h4>
                            <p>index: {index}</p>
                            <p>id: {book.id}</p>
                          </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                  </div>
              )}
            </Droppable>
          </div>
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
