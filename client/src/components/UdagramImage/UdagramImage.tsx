import * as React from 'react'
import { Card, Comment, Image, Header } from 'semantic-ui-react'
import { ImageDescription } from './ImageDescription'
import { UdagramComment } from './UdagramComment'
import { ImageItem } from '../../types/ImageItem'
import { CommentItem } from '../../types/CommentItem'

interface ImageCardProps {
  image: ImageItem
  onImageDelete: (imageId: string) => void
}

interface ImageCardState {}

export class UdagramImage extends React.PureComponent<
  ImageCardProps,
  ImageCardState
> {
  render() {
    const { image } = this.props
    return (
      <Card fluid color="red">
        {image.imageUrl && <Image src={image.imageUrl} wrapped ui={false} />}
        <Card.Content>
          <ImageDescription
            image={image}
            onImageDelete={this.props.onImageDelete}
          />
          <Comment.Group>
            <Header as="h1" dividing>
              Comments
            </Header>
            {image.comments &&
              image.comments.map((comment: CommentItem) => (
                <UdagramComment
                  text={comment.text}
                  createdAt={comment.createdAt}
                />
              ))}
          </Comment.Group>
        </Card.Content>
      </Card>
    )
  }
}
