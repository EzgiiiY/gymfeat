import exercises from '../../data/exercises.json'

const ExerciseList = (exercises) =>{
    return  (
        <List
        dataSource={exercises}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href={item.Link}>{item.Name}</a>}
              description={item.Start}
            />
            <div>Content</div>
          </List.Item>
        )}
      >
      </List>
    );
}


