import * as React from 'react'
import { ImageItem } from '../types/ImageItem'
import { getImages, deleteImage } from '../api/images-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { UdagramImage } from './UdagramImage'
import { History } from 'history'
import Auth from '../auth/Auth'

interface ImagesListProps {
  history: History
  auth: Auth
}

interface ImagesListState {
  images: ImageItem[]
}

export class ImagesList extends React.PureComponent<
  ImagesListProps,
  ImagesListState
> {
  state: ImagesListState = {
    images: []
  }

  handleCreateImage = () => {
    this.props.history.push(`/images/create`)
  }

  async componentDidMount() {
    try {
      const images = await getImages(this.props.auth.getIdToken())
      this.setState({
        images
      })
    } catch (e) {
      alert(`Failed to fetch images for group : ${e.message}`)
    }
  }

  onImageDelete = async (imageId: string) => {
    try {
      await deleteImage(this.props.auth.getIdToken(), imageId)
      this.setState({
        images: this.state.images.filter((image) => image.imageId != imageId)
      })
    } catch {
      alert('Image deletion failed')
    }
  }

  render() {
    return (
      <div>
        <h1>Images</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateImage}
        >
          Upload new image
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.images.map((image) => {
            return (
              <UdagramImage
                key={image.imageId}
                image={image}
                onImageDelete={this.onImageDelete}
              />
            )
          })}
        </Card.Group>
      </div>
    )
  }
}
