import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';

// Updated FoodTask components
function FoodTask(props) {
    const foodTask = props.foodTask;

    function handleDelete() {
        props.remove(foodTask);
    }

    function handleStatusChange() {
        props.toggleCompleted(foodTask);
    }

    return (
        <li className="food-task">
            <div className="food-task-details">
                <p>
                    <span>
                        <input
                            type="checkbox"
                            onChange={handleStatusChange}
                            value={foodTask.completed}
                        />
                        <span className="food-task-title">
                            {foodTask.completed === true ? <del>{foodTask.name}</del> : foodTask.name}
                        </span>
                    </span>
                    <span className="food-task-description">{foodTask.details}</span>
                </p>
            </div>
            <div onClick={handleDelete} className="remove-btn">
                <span>Delete</span>
            </div>
        </li>
    );
}

function FoodTaskForm(props) {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDetailsChange(e) {
        setDetails(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newFoodTask = {
            name: name,
            details: details,
            completed: false,
            id: nanoid()
        };
        props.addFoodTask(newFoodTask);
        setName("");
        setDetails("");
    }

    return (
        <div className="edit">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        onChange={handleNameChange}
                        value={name}
                        className="newFoodTask"
                        placeholder="Add new food task..."
                    />
                </label>
                <button className="add-btn">Add</button>
            </form>
        </div>
    );
}

function FoodTaskList() {
    const [foodTasks, setFoodTasks] = useState([]);

    function addFoodTask(foodTask) {
        const updatedFoodTasks = [...foodTasks, foodTask];
        setFoodTasks(updatedFoodTasks);
    }

    function removeFoodTask(foodTaskToRemove) {
        const updatedFoodTasks = foodTasks.filter(function (foodTask) {
            return foodTask.id !== foodTaskToRemove.id;
        });
        setFoodTasks(updatedFoodTasks);
    }

    function toggleFoodTaskCompleted(foodTaskToToggle) {
        const updatedFoodTasks = foodTasks.map(function (foodTask) {
            if (foodTask.id === foodTaskToToggle.id) {
                foodTask.completed = !foodTask.completed;
            }
            return foodTask;
        });
        setFoodTasks(updatedFoodTasks);
    }

    return (
        <div>
            <ul>
                {foodTasks.map((foodTask) => (
                    <FoodTask
                        key={foodTask.id}
                        foodTask={foodTask}
                        remove={removeFoodTask}
                        toggleCompleted={toggleFoodTaskCompleted}
                    />
                ))}
            </ul>
            <FoodTaskForm addFoodTask={addFoodTask} />
        </div>
    );
}

export default function IngredientBox({ ingredient }) {
    // You can use the FoodTaskList or any of its components within the IngredientBox component
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {ingredient}
                </Text>
                <FoodTaskList /> {/* Include the FoodTaskList here */}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 90,
        height: 100, // Adjust the height to fit the added content
        backgroundColor: colors.asparagus,
        justifyContent: 'center',
        borderRadius: 7
    },
    text: {
        color: colors.offWhite,
        fontFamily: 'Manrope-Bold',
        fontSize: 12
    }
});
