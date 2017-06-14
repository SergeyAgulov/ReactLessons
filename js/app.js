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
      <Add/>
    <News data={my_news}/>
  </div>
  );
}
});


var Add = React.createClass({
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  getInitialState: function() {
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },
  onCheckRuleClick: function(e) {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked});
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
  },
  onAuthorChange: function(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({authorIsEmpty: false})
    } else {
      this.setState({authorIsEmpty: true})
    }
  },
  onTextChange: function(e) {
    if (e.target.value.trim().length > 0) {
      this.setState({textIsEmpty: false})
    } else {
      this.setState({textIsEmpty: true})
    }
  },
  render: function() {
    let agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;
    return (
      <form className='add cf'>
        <input
        type='text'
        className='add__author'
        defaultValue=''
        placeholder='Ваше имя'
        ref='author'
        onChange={this.onAuthorChange}
        />
        <textarea
        className='add__text'
        defaultValue=''
        placeholder='Текст новости'
        ref='text'
        onChange={this.onTextChange}
        >
        </textarea>
        <label className='add__checkrule'>
        <input 
        type='checkbox'
        defaultChecked={false}
        ref='checkrule'
        onChange={this.onCheckRuleClick}
        />Я согласен с
        правилами
        </label>
        <button
        className='add__btn'
        onClick={this.onBtnClickHandler}
        ref='alert_button'
        disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
        Показать alert
        </button>
      </form>
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
        <strong className={'news__count ' + (data.length = 0 ? 'none' : '')}>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);