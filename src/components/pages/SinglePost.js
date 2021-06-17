import React,{useContext,useState,useRef} from 'react';
import {gql,useQuery, useMutation} from '@apollo/client';
import { Card, Icon, Label, Image, Button,Grid,Form } from "semantic-ui-react";
import moment from 'moment';
import LikeButton from './LikeButton';
// import { FETCH_POSTS_QUERY } from '../../utils.js/graphql';
import {AuthContext} from '../../context/auth';
import DeleteButton from '../DeleteButton';


export default function SinglePost(props) {
    const postId = props.match.params.postId;
    // console.log(postId);
    const{ user} = useContext(AuthContext);
    const commentInputRef = useRef(null)
const [comment,setComment] = useState('');

    const {data,loading} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postId: postId
        }
    });
    
const[submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
    update(){
setComment('');
commentInputRef.current.blur();
    },
    variables:{
        postId,
body:comment
    }})
function deletePostCallback(){
    props.history.push('/')
}

    let postMarkup;
    if(loading){
        postMarkup = <p>Loading Post...</p>
    } else {
       const {id,body,createdAt,username,comments,likes,likeCount,commentCount } = data.getPost;
       postMarkup = (
           <Grid>
               <Grid.Row>
                   <Grid.Column width={2}><Image floated="right"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"></Image></Grid.Column>
 <Grid.Column width={10}>
     <Card fluid>
         <Card.Content>
             <Card.Header>{username}</Card.Header>
             <Card.Meta>
{moment(createdAt).fromNow()}
             </Card.Meta>
       <Card.Description>{body}</Card.Description>
         </Card.Content>
         <hr/>
         <Card.Content extra>
             <LikeButton user={user} post ={{id,likeCount,likes}}></LikeButton>
             <Button labelPosition="right" as='div' onClick={()=> console.log('comment')}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
             {user && user.username === username && (
                 <DeleteButton postId={id} callback={deletePostCallback}/>
             )}
         </Card.Content>
     </Card>
     {user && (
         <Card fluid>
<Card.Content><p>Post a Comment</p>
<Form>
   <div className="ui action input fluid">
       <input type="text" placeholder="comment..." name="comment" value={comment} onChange={event => setComment(event.target.value)} ref={commentInputRef}/>
       <button type='submit' class="ui button teal"disabled={comment.trim() === ''} onClick={submitComment}>Submit</button>
   </div>
</Form></Card.Content>
         </Card>
     )}
     {comments.map( comment => (
     <Card fluid key={comment.id}>
         <Card.Content>
             {user && user.username === comment.username && (
                 <DeleteButton postId={id} commentId={comment.id}/>
             ) }
             <Card.Header>{comment.username}</Card.Header>
     <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
     <Card.Description>{comment.body}</Card.Description>
         </Card.Content>
     </Card>))}
 </Grid.Column>
               </Grid.Row>
           </Grid>
       )
    }
    // if()
    return (
       postMarkup
    )
}

const FETCH_POST_QUERY = gql`query getPost($postId:ID!){
    getPost(postID:$postId){
        id
        body
        createdAt username likeCount likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}`;

const SUBMIT_COMMENT_MUTATION = gql`
mutation($postId:ID!, $body:String!){
    createComment(postId:$postId, body:$body){
        id
        comments{
            id
            body
            createdAt 
            username
        }
        commentCount
    }
}
`