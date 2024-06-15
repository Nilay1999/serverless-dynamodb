import * as dynamoose from 'dynamoose';

const postSchema = new dynamoose.Schema({
  postId: {
    type: String,
    hashKey: true,
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
  }
});

const PostModel = dynamoose.model('Posts', postSchema);

export default PostModel;
