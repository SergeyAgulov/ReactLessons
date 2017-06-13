let my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

let App = React.createClass({
render: function() {
  return (
    <div className='app'>
      <h3>Новости</h3>
    <News data={my_news}/>
  </div>
  );
}
});

let Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    bigText: React.PropTypes.string.isRequired,
    })
  },
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },
  render: function() {
    let author = this.props.data.author;
    let text = this.props.data.text;
    let bigText = this.props.data.bigText;
    let visible = this.state.visible;
    console.log('render',this); //добавили console.log
    return (
      <div className='article'>
        <p className='news__author'>{author}</p>
        <p className='news__count'>{text}</p>
        <a href="#" onClick={this.readmoreClick} className={'news__readmore ' + (visible ? 'none' : '')}>Подробнее</a>
        <p className={'news__bigText ' + (visible ? '' : 'none')}>{bigText}</p>
      </div>
    )
  }
});



let News = React.createClass({
  getInitialState: function() {
    return {
      counter: 0
  }
},
  onTotalNewsClick: function() {
    this.setState({counter: ++this.state.counter });
  },
  render: function() {
    let data = this.props.data;
    let newsTemplate;
    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        
        return (
          <div key={index}>
            <Article data={item}/>
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }
    return (
      <div className="news">
        {newsTemplate}
        <strong onClick={this.onTotalNewsClick} className={'news__count ' + (data.length = 0 ? 'none' : '')}>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);