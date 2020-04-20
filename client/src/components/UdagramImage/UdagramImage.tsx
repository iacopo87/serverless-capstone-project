import * as React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { ImageDescription } from './ImageDescription'
import { UdagramFooter } from './UdagramFooter'
import { ImageItem } from '../../types/ImageItem'
import Auth from '../../auth/Auth'

interface ImageCardProps {
  auth: Auth
  image: ImageItem
  onImageDelete: (imageId: string) => void
}

export class UdagramImage extends React.PureComponent<ImageCardProps> {
  render() {
    const { image, auth } = this.props

    return (
      <Card fluid color="red">
        {image.imageUrl && <Image src={image.imageUrl} wrapped ui={false} />}
        <Card.Content>
          <ImageDescription
            image={image}
            onImageDelete={this.props.onImageDelete}
          />
          <UdagramFooter
            auth={auth}
            imageId={image.imageId}
            comments={image.comments}
          />
        </Card.Content>
      </Card>
    )
  }
}
