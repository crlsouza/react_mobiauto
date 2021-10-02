import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', filter: 'abertos', search: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({ search: e.target.value });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      done: false,
    };
    this.setState((state) => ({
      items: state.items.concat(newItem),
      text: '',
    }));
  }

  handleListItem(id) {
    const newItems = this.state.items.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({ items: newItems });
  }

  handleFilter(type) {
    this.setState({ filter: type });
  }

  render() {
    const inputStyle = {
      padding: '4px',
      margin: '4px',
    };

    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Helvetica',
        }}
      >
        <div
          style={{
            maxWidth: '70vw',
            minHeight: '40vh',
            padding: '18px',
            backgroundColor: '#eee',
            borderRadius: '4px',
          }}
        >
          <h3>Lista de Tarefas</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={this.state.text}
              placeholder="Descrição da tarefa"
              style={inputStyle}
            />
            <button style={inputStyle}>Inserir</button>
          </form>

          <input
            onChange={this.handleSearch}
            value={this.state.search}
            placeholder="Perquisar tarefa"
            style={inputStyle}
          />

          {this.state.filter === 'abertos' ? (
            <button
              style={{ marginTop: 16 }}
              onClick={() => this.handleFilter('concluidos')}
              style={inputStyle}
            >
              Filtrar concluídos
            </button>
          ) : (
            <button
              style={{ marginTop: 16 }}
              onClick={() => this.handleFilter('abertos')}
              style={inputStyle}
            >
              Filtrar abertos
            </button>
          )}

          <Tasks
            items={this.state.items}
            onClick={(id) => this.handleListItem(id)}
            filter={this.state.filter}
            search={this.state.search}
          />
        </div>
      </div>
    );
  }
}

class Tasks extends React.Component {
  itemsFiltered() {
    if (this.props.search.length > 0) {
      return this.props.items.filter((item) => {
        return item.text.startsWith(this.props.search);
      });
    } else if (this.props.filter === 'abertos') {
      return this.props.items.filter((item) => {
        return !item.done;
      });
    } else if (this.props.filter === 'concluidos') {
      return this.props.items.filter((item) => {
        return item.done;
      });
    }
  }

  render() {
    return (
      <ul>
        {this.itemsFiltered().map((item) => (
          <li
            key={item.id}
            onClick={() => this.props.onClick(item.id)}
            style={{
              textDecoration: item.done ? 'line-through' : 'none',
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    );
  }
}
