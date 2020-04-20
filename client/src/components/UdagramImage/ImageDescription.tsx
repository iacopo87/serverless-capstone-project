import * as React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { ImageItem } from '../../types/ImageItem'
import { Button, Icon, Grid, Card } from 'semantic-ui-react'

type UdagramHeaderProps = {
  image: ImageItem
  onImageDelete: (imageId: string) => void
}
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo()

export const ImageDescription: React.FC<UdagramHeaderProps> = ({
  image,
  onImageDelete
}) => (
  <Grid padded>
    <Grid.Row key={image.imageId}>
      <Grid.Column width={3} verticalAlign="middle">
        <Card.Header> {image.title}</Card.Header>
        <Card.Meta>
          <span className="date">
            {timeAgo.format(new Date(image.createdAt))}
          </span>
        </Card.Meta>
      </Grid.Column>
      {image.isCurrentUser && (
        <Grid.Column width={3} floated="right">
          <Button icon color="red" onClick={() => onImageDelete(image.imageId)}>
            <Icon name="delete" />
          </Button>
        </Grid.Column>
      )}
    </Grid.Row>
  </Grid>
)
