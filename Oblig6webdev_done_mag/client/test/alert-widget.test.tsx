import * as React from 'react';
import { Alert, Row, Card, Column, Button, Form } from '../src/widgets';
import { TaskDetails, TaskEdit, TaskList, TaskNew } from '../src/task-components';
import * as taskService from '../src/task-service'
import { shallow } from 'enzyme';

describe('Alert tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<div></div>)).toEqual(true);
  });

  test('Show alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <div>
            <div>
              test
              <button />
            </div>
          </div>
        )
      ).toEqual(true);

      done();
    });
  });

  test('Close alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <div>
            <div>
              test
              <button />
            </div>
          </div>
        )
      ).toEqual(true);

      wrapper.find('button.btn-close').simulate('click');

      expect(wrapper.matchesElement(<div></div>)).toEqual(true);

      done();
    });
  });
});



/// NEW CODE (AS PART OF ASSIGNEMENT )
describe('Part 2: Open 3 and close the second one', () => {

  test('Close the seconnd alert message (making three)', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('Alert1');
    Alert.danger('Alert2');
    Alert.danger('Alert3');

    setTimeout(() => {
      expect( //Before deelting
        wrapper.matchesElement(
          <div>
            <div>
              Alert1
              <button/>
            </div>
            <div>
              Alert2
              <button/>
            </div>
            <div>
              Alert3
              <button/>
            </div>
          </div>
        )
      ).toEqual(true);

      wrapper.find('button.btn-close').at(1).simulate('click'); //at(1) does so that the second object in the wrapper (Alert 2) is cloed

      expect(wrapper.matchesElement( //After deleting
        <div>
          <div>
            Alert1
            <button/>
          </div>
          <div>
            Alert3
            <button/>
          </div>
        </div>
      )).toEqual(true);

      done();
    });
  });
});

//Testing TaskDetails (no snapshot)

// describe('Part 2: Testing TaskDetails', () => {

//   test("Taskdetails with snapshot", (done) => {
//     const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);
    
//     setTimeout(() => {
//       expect(wrapper).toMatchSnapshot();
//       done(); 
//     }, 0); 
//   });

//   test("TaskList with snapshot", (done) => {
//     const wrapper = shallow(<TaskList />);
    
//     setTimeout(() => {
//       expect(wrapper).toMatchSnapshot();
//       done(); 
//     }, 0); 
//   });

  
//   test("TaskNew with snapshot", (done) => {
//     const wrapper = shallow(<TaskNew />);
    
//     setTimeout(() => {
//       expect(wrapper).toMatchSnapshot();
//       done(); 
//     }, 0); 
//   });


//   test("TaskEdit with snapshot", (done) => {
//     const wrapper = shallow(<TaskEdit match={{ params: { id: 2 } }}/>);
    
//     setTimeout(() => {
//       expect(wrapper).toMatchSnapshot();
//       done(); 
//     }, 0); 
//   });



// //My attempt at the second part of part 2 (I failed)



//   test('Testing TaskDetails without using a snapshot', (done) => {
//     const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />)

//     setTimeout(() => {
//       expect(
//         wrapper.containsAnyMatchingElements([ //Tried a lot of things here, gave up in the end
// <>
//   <Card
//     title="Task"
//   >
//     <Row>
//       <Column
//         width={2}
//       >
//         Title:
//       </Column>
//       <Column />
//     </Row>
//     <Row>
//       <Column
//         width={2}
//       >
//         Description:
//       </Column>
//       <Column
//         width={2}
//       />
//     </Row>
//     <Row>
//       <Column
//         width={2}
//       >
//         Done:
//       </Column>
//       <Column>
//         <Form.Checkbox/>
//       </Column>
//     </Row>
//   </Card>

//   <Button.Success>
//     Edit
//   </Button.Success>
// </>
//         ])
//       ).toEqual(true);

//       done();
//     });
//   });
// });

