import {useState} from 'react'
import { Icon,  Button, Confirm} from "semantic-ui-react";
import {useMutation , gql } from '@apollo/client';
import {FETCH_POSTS_QUERY} from '../utils.js/graphql';

function DeleteButton({postId,commentId,callback}) {

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION
const [deletePostOrComment] = useMutation(mutation,{
    update(proxy){
        if(!commentId){
        const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          });
    let newData = [...data.getPosts];
    newData = newData.filter(p => p.id !== postId);
    proxy.writeQuery({
      query: FETCH_POSTS_QUERY,
      data: {
        ...data,
        getPosts: {
          newData,
        },
      },
    });
}
if(callback){
    callback();
}
    },
    variables:{
postID: postId,
commentId
    }
});
function deleteCallback(){
    let deleteConfirm = confirm('do you want to delete this post?');
    if(deleteConfirm){
        console.log(postId)
    deletePostOrComment();
    } else {
        console.log('not deleted');
    }
}
    return (
        <>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => { deleteCallback() }}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>

      </>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postID:ID!){
    deletePost(postID:$postID)
}`;

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postID:ID!, $commentId:ID!){
    deleteComment(postID:$postID, commentId: $commentId){
        id
        comments{
            id username createdAt body
        }
        commentCount
    }
}`
export default DeleteButton;