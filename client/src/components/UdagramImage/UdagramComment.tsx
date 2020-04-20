import * as React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Comment } from 'semantic-ui-react'
import avatar from '../../elliot.jpg'

type CommentProps = {
  text: string
  createdAt: string
}
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

export const UdagramComment: React.FC<CommentProps> = ({ text, createdAt }) => (
  <Comment>
    <Comment.Avatar src={avatar} />
    <Comment.Content>
      <Comment.Metadata>
        <div>{timeAgo.format(new Date(createdAt))}</div>
      </Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
    </Comment.Content>
  </Comment>
)
