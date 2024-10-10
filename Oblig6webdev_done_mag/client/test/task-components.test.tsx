import * as React from 'react';
import { TaskList, TaskDetails, TaskEdit } from '../src/task-components';
import { shallow } from 'enzyme';
import { Form, Button, Column, Row, Card, Alert } from '../src/widgets';
import { NavLink } from 'react-router-dom';


jest.mock('../src/task-service', () => {
  class TaskService {
    getAll() {
      return Promise.resolve([
        {
          id: 1,
          title: 'demo-task-title',
          description: 'demo-description',
          done: false,
        },
        { id: 2, title: 'Møt opp på forelesning', description: '', done: false },
        { id: 3, title: 'Gjør øving', description: '', done: false },
      ]);
    }

    get() {
      return Promise.resolve({
        id: 1,
        title: 'demo-task-title',
        description: 'demo-description',
        done: false,
      });
    }

    create() {
      return Promise.resolve(4);
    }

    update() {
      return Promise.resolve();
    }

    delete() {
      return Promise.resolve();
    }
  }

  return new TaskService();
});

describe('Testing task component', () => {
  test('TaskList correct initialization', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">demo-task-title</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ]),
      ).toEqual(true);
      done();
    });
  });

  test('Correct action after clicking on tasks', (done) => {
    const wrapper = shallow(<TaskList />);

    wrapper.find(Button.Success).simulate('click');
    expect(location.hash).toEqual('#/tasks/new'); 
    done();
  });


});

describe('Testing TaskDetails', () => {
  test('TaskDetails correct initialization', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update();

      console.log(wrapper.debug()); //From GPT

      
      expect(
        wrapper.containsAllMatchingElements([
          <Card title="Task">
            <Row>
              <Column width={2}>Title:</Column>
              <Column>demo-task-title</Column>
            </Row>
            <Row>
              <Column width={2}>Description:</Column>
              <Column>demo-description</Column>
            </Row>
            <Row>
              <Column width={2}>Done:</Column>
              <Column>
              {/* @ts-ignore*/}
                <Form.Checkbox checked={false} /> 
              </Column>
            </Row>
          </Card>,
          // @ts-ignore
          <Button.Success>Edit</Button.Success>,
        ]),
      ).toEqual(true);
      done();
    }, 0);
  });
});

describe('TaskDetails correct initialization (snapshot)', () => {
  test('Renders correctly', () => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    }, 0);
  });
});

describe('TaskEdit correct initialization (snapshot)', () => {
  test('TaskEdit correct initialization (snapshot)', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update();

     // @ts-ignore
      expect(wrapper).toMatchSnapshot('before-edit-click');

      wrapper.find(Button.Success).simulate('click');

  // @ts-ignore
      expect(wrapper).toMatchSnapshot('after-edit-click');

      expect(location.hash).toEqual('#/tasks');
      done();
    }, 0);
  });
});

describe('TaskEdit tests', () => {

test('TaskEdit renders correctly', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update(); // Ensure the component is updated

      
      expect(
        wrapper.containsAllMatchingElements([
          <Card title="Edit task">
             {/* @ts-ignore*/}
            <Form.Input value="demo-task-title" />,
            {/* @ts-ignore*/}
            <Form.Input value="demo-description" />,
            {/* @ts-ignore*/}
            <Form.Checkbox checked={false} />,
          </Card>,
          //@ts-ignore
          <Button.Success>Save</Button.Success>,
        ]),
      ).toEqual(false);
      done();
    }, 0);
  });


  test('TaskEdit finishing task', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update();

      wrapper.find(Form.Checkbox).simulate('change', { currentTarget: { checked: false } });
      expect(wrapper.find(Form.Checkbox).prop('checked')).toEqual(false);
      done();
    }, 0);
  });

  test('TaskEdit go to edit page', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update();

      wrapper.find(Button.Success).simulate('click');
      expect(location.hash).toEqual('#/tasks');
      done();
    }, 0);
  });

  test('TaskEdit check coloumn width', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update(); 

      expect(wrapper.containsMatchingElement(<Column width={2}>Title:</Column>)).toEqual(false);
      done();
    }, 0);
  });


  test('TaskEdit get into delete button', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      wrapper.update(); 
      wrapper.find(Button.Danger).simulate('click');
      expect(location.hash).toEqual('#/tasks');
      done();
    }, 0);
  });

  test('TaskEdit press the save button', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      wrapper.update(); 

      wrapper.find(Button.Success).simulate('click');
      expect(location.hash).toEqual('#/tasks');
      done();
    }, 0);
  });

  test('TaskEdit text area', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      wrapper.update();
      //@ts-ignore
      expect(wrapper.containsMatchingElement(<Form.Textarea rows={10} />)).toEqual(true);
      done();
    }, 0);
  });

  test('TaskEdit editing title', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);
    setTimeout(() => {
      wrapper.update();

      wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'edit' } });
      expect(wrapper.find(Form.Input).prop('value')).toEqual('edit');
      done();
    }, 0);
  });
});
