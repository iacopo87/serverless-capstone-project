import * as React from 'react'
import dateFormat from 'dateformat'
import { Card, Image, Button, Icon, Grid } from 'semantic-ui-react'
import { ImageItem } from '../types/ImageItem'

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
    const {
      imageId,
      createdAt,
      title,
      imageUrl,
      isCurrentUser,
      comments
    } = this.props.image

    return (
      <Card fluid color="red">
        <Card.Content>
          <Card.Header>
            <Grid padded>
              <Grid.Row key={imageId}>
                <Grid.Column width={3} verticalAlign="middle">
                  {this.props.image.title}
                </Grid.Column>
                {isCurrentUser && (
                  <Grid.Column width={3} floated="right">
                    <Button
                      icon
                      color="red"
                      onClick={() => this.props.onImageDelete(imageId)}
                    >
                      <Icon name="delete" />
                    </Button>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </Card.Header>
          <Card.Description>
            {`${dateFormat(createdAt, 'shortDate')} ${dateFormat(
              createdAt,
              'shortTime'
            )}`}
          </Card.Description>
          {imageUrl && <Image src={imageUrl} />}
        </Card.Content>
      </Card>
    )
  }
}
