import React, { Component } from 'react';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 0, name: 'Learn React 1', complete: false },
                { id: 1, name: 'Learn React 2', complete: true },
                { id: 2, name: 'Learn React 3', complete: false },
            ],
            add: ''
        }
    }
    addList = (e) => {
        e.preventDefault();
        if (this.state.add !== '') {
            const id = this.state.list.length;
            const complete = false;
            const name = this.state.add;
            const add = { id, name, complete }
            const list = [...this.state.list]
            list.push(add);
            this.setState({ add: '' })
            return this.setState({ list: list })
        }
    };
    complete = (item) => {
        const list = [...this.state.list];
        const selected = list.filter(select => select.id === item)
        selected[0].complete = true
        list.concat(selected)

        return this.setState({ list })
    }
    clearComplete = (e) => {
        e.preventDefault();
        const list = this.state.list.filter(item => item.complete !== true)

        return this.setState({ list })
    }
    render() {
        console.log(this.state.list);
        const itemleft = this.state.list.filter(item => item.complete !== true).length;
        return (
            <>
                <img src='../images/bg-desktop-dark.jpg' className='background' />
                <div className='main'>
                    <div className='main2'>
                        <div className='header mb-4'>
                            <h2>TODO</h2>
                            <span><img src="../images/icon-sun.svg" /></span>
                        </div>
                        <form className='mb-5'
                            onClick={this.addList}
                        >
                            <input type='text'
                                placeholder="Enter Your List"
                                value={this.state.add}
                                onChange={(e) => this.setState({ add: e.target.value })}
                            />
                            <div className='submit'>
                                <button className='btn btn-outline-primary ms-3' >Submit</button>
                            </div>
                        </form>
                        {this.state.list.length !== 0 ?
                            this.state.list.map(item => {
                                return (
                                    <div key={item.id} className='list'>
                                        {item.complete ?
                                            <div>
                                                <span className='text-secondary complete'>{item.name}</span>
                                                <button className='btn btn-outline-info' disabled
                                                    onClick={() => this.complete(item.id)}
                                                >Complete</button>
                                            </div>
                                            :
                                            <div>
                                                <span>{item.name}</span>
                                                <button className='btn btn-info'
                                                    onClick={() => this.complete(item.id)}
                                                >Complete</button>
                                            </div>
                                        }

                                    </div>
                                )
                            })
                            : <h3 className='text'>Nice There is Nothing To Do</h3>
                        }
                        <div className='footer text-secondary p-3'>
                            <span>{itemleft}
                                {itemleft >= 2 ? <span> items left</span> : <span> item left</span>
                                }
                            </span>
                            <div className='contact'>
                                <h6 className='me-2 active'>All</h6>
                                <h6 className='me-2'>Active</h6>
                                <h6 className='me-2'>Completed</h6>
                            </div>
                            {
                                this.state.list.length !== 0 ?
                                    <h6
                                        onClick={this.clearComplete}
                                    >
                                        Clear Complete
                                    </h6>
                                    :
                                    <h6 disabled
                                        onClick={this.clearComplete}
                                    >
                                        Clear Complete
                                    </h6>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Main;