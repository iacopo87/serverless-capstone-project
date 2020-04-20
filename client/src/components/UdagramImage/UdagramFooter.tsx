import * as React from 'react'
import { Card, Comment, Image, Header, Form, Button } from 'semantic-ui-react'
import { UdagramComment } from './UdagramComment'
import { CommentItem } from '../../types/CommentItem'
import { createComment } from '../../api/images-api'
import Auth from '../../auth/Auth'

interface UdagramFooterProps {
  auth: Auth
  imageId: string
  comments?: CommentItem[]
}

interface UdagramFooterState {
  comments: CommentItem[]
  newComment: string
}

export class UdagramFooter extends React.PureComponent<
  UdagramFooterProps,
  UdagramFooterState
> {
  state = {
    comments: [],
    newComment: ''
  }

  static getDerivedStateFromProps(
    nextProps: UdagramFooterProps,
    state: UdagramFooterState
  ) {
    return {
      comments: state.comments.length != 0 ? state.comments : nextProps.comments
    }
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const { auth, imageId } = this.props

    if (this.state.newComment) {
      try {
        const newComment = await createComment(
          auth.getIdToken(),
          imageId,
          this.state.newComment
        )

        this.setState({
          comments: [...this.state.comments, newComment],
          newComment: ''
        })
      } catch {
        alert('comment creation failed')
      }
    }
  }

  handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newComment: event.target.value })
  }

  render() {
    return (
      <Comment.Group>
        <Header as="h1" dividing>
          Comments
        </Header>
        {this.state.comments &&
          this.state.comments
            .sort((a: CommentItem, b: CommentItem) =>
              a.createdAt < b.createdAt ? 1 : -1
            )
            .map((comment: CommentItem) => (
              <UdagramComment
                key={comment.commentId}
                text={comment.text}
                createdAt={comment.createdAt}
              />
            ))}
        <Form onSubmit={this.handleSubmit} reply>
          <Form.Input
            value={this.state.newComment}
            onChange={this.handleCommentChange}
          />
          <Button
            content="Add comment"
            labelPosition="left"
            icon="edit"
            primary
            type="submit"
          />
        </Form>
      </Comment.Group>
    )
  }
}
