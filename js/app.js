let my_news = [
  {
    author: 'Vasya Pupkin',
    text: 'text 1'
  },
  {
    author: 'Masha Ivanova',
    text: 'ashhydhdjdujdujju'
  },
  {
    author: 'Petya Vasyliev',
    text: 'dyjdujffjkuf'
  }
];

let App = React.createClass({
render: function() {
  return (
    <div className='app'>
    Hello Component!
    <News data={my_news}/>
    <Comments/>
  </div>
  );
}
});

let News = React.createClass({
  render: function() {
    let data = this.props.data;
    let newsTemplate;
    
    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <p className="news__author">{item.author}:</p>
            <p className="news__text">{item.text}</p>
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }
    return (
      <div className="news">
        {newsTemplate}
        <strong>Всего новостей: {data.length}</strong>
      </div>
    );
  }
  });

  let Comments = React.createClass({
    render: function() {
    return (
    <div className='comments'>
    Пока нет комментариев
    </div>
    )
    }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);