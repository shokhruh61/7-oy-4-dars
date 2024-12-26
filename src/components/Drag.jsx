import React, { useState, useEffect, createContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoContext = createContext();

function Drag() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const addTodo = localStorage.getItem("todo");
    if (addTodo) {
      setData(JSON.parse(addTodo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(data));
  }, [data]);

  function validate() {
    if (name.trim().length <= 0) {
      alert("Ma'lumot mavjud emas");
      return false;
    }
    return true;
  }

  function handleOk(e) {
    e.preventDefault();
    const isvalid = validate();
    if (!isvalid) return;

    const info = {
      name,
      id: Date.now(),
    };
    setData([...data, info]);
    setName("");
  }

  function handleClear(id) {
    const newData = data.filter((prev) => prev.id !== id);
    setData(newData);
  }

  function handleDrag(result) {
    if (!result.destination) return;

    const items = Array.from(data);
    const [res] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, res);

    setData(items);
  }

  return (
    <TodoContext.Provider value={{ data, handleClear }}>
      <div>
        <div className="bg-blue-300 w-[400px] mx-auto p-5 text-center mt-12 rounded-md shadow-md">
          <h2 className="text-2xl font-medium mb-3">Todo List</h2>
          <form onSubmit={handleOk}>
            <input
              className="w-[80%] rounded-md py-1 px-3 mb-2 mr-2 focus:outline-none shadow-md"
              type="text"
              placeholder="work"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="bg-green-500 rounded-md text-white py-1 px-3 hover:bg-green-600">
              Add
            </button>
          </form>
        </div>

        <div className="bg-blue-300 w-[400px] mx-auto p-5 text-center mt-5 rounded-md shadow-md">
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {data.length > 0 ? (
                    data.map((value, index) => (
                      <Draggable
                        key={value.id}
                        draggableId={value.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex gap-3"
                          >
                            <li className="bg-white py-2 rounded-md w-full mb-3 shadow-md cursor-move text-xl">
                              {value.name}
                            </li>
                            <button
                              onClick={() => handleClear(value.id)}
                              className="bg-red-500 px-3 text-white rounded-md hover:bg-red-600 mb-3"
                            >
                              clear
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p>manashu yerga qo'shiladi cardlar</p>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default Drag;
