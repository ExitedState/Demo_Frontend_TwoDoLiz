import React, { useEffect, useState, useCallback } from "react";
import './TaskList.css';
import { Row, Col, Tabs, Layout, message } from "antd";
import TaskTab from "./TaskTab";
import TaskForm from "./TaskForm";
import { createTask, loadTasks, updateTask, deleteTask } from '../services/taskService.js';

const { TabPane } = Tabs;
const { Content } = Layout;

const TaskList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleFormSubmit = (task) => {
        console.log('task create : ', task);
        createTask(task).then(onRefresh());
        message.success('Task added successfully');
    }

    const handleRemoveTask = (task) => {
        deleteTask(task.id).then(onRefresh());
        message.warn('Task deleted successfully');
    }

    const handleToggleTaskStatus = (task) => {
        task.completed = !task.completed;
        updateTask(task).then(onRefresh());
        message.info('Task status updated successfully');
    }

    const refresh = () => {
        loadTasks()
            .then(json => {
                setTasks(json);
                setActiveTasks(json.filter(task => task.completed === false));
                setCompletedTasks(json.filter(task => task.completed === true));
            }).then(console.log('fetch completed : ', tasks))
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTasks();
        setTasks(data);
        setActiveTasks(data.filter((task => task.completed === false)));
        setCompletedTasks(data.filter((task => task.completed === true)));
        setRefreshing(false);
        console.log('Refreshing state : ', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])
    
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="tasklist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>TwoDoLiz</h1>
                            <TaskForm onFormSubmit={handleFormSubmit} />
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TaskTab task={tasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}/>
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                <TaskTab task={activeTasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}/>
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                <TaskTab task={completedTasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>)
}

export default TaskList;