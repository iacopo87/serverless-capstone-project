import * as React from 'react'
import dateFormat from 'dateformat'
import { Card, Image } from 'semantic-ui-react'
import { ImageItem } from '../types/ImageItem'

interface ImageCardProps {
  image: ImageItem
}

interface ImageCardState {}

export class UdagramImage extends React.PureComponent<
  ImageCardProps,
  ImageCardState
> {
  render() {
    return (
      <Card fluid color="red">
        <Card.Content>
          <Card.Header>{this.props.image.title}</Card.Header>
          <Card.Description>
            {`${dateFormat(
              this.props.image.createdAt,
              'shortDate'
            )} ${dateFormat(this.props.image.createdAt, 'shortTime')}`}
          </Card.Description>
          {this.props.image.imageUrl && (
            <Image src={this.props.image.imageUrl} />
          )}
        </Card.Content>
      </Card>
    )
  }
}
