import React, {useContext} from "react";
import { useQuery } from '@apollo/client';
import { Grid, Image, Transition} from 'semantic-ui-react';
import PostCard from '../PostCard';
import {AuthContext} from '../../context/auth';
import PostForm from '../pages/PostForm';
import {FETCH_POSTS_QUERY} from '../../utils.js/graphql';

 function Home() {
     const {user} = useContext(AuthContext);
    const {
        loading,
        data
      } = useQuery(FETCH_POSTS_QUERY);
  return (
    <div>
   
  <Grid columns={3} >
  <Grid.Row className='page-title'>
      <h1>Recent Post</h1>
  </Grid.Row>
  
  {
      user && (
          <Grid.Column>
              <PostForm/>
          </Grid.Column>
      )
  }
    <Grid.Row>

     {loading ? <h1>Loading post...</h1> :(<Transition.Group>{
         data.getPosts && data.getPosts.map(post => (
<Grid.Column key={post.id}>
    <PostCard post={post}></PostCard>
</Grid.Column>
         ))
     }</Transition.Group>  )}
    </Grid.Row>
    </Grid>
    </div>
  );
}


export default Home;