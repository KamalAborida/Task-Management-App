# Loaders

- Loader returned data are promises

```
export const loader = async () => {
  const userData = await getUserData();
  const tasksData = await getTasks();

  // getUserData() is a function in utilis/landingPageLoaders.js
  // that function makes a get request and returns the response data after changing it from json to string

  // getTasks() is just like getUserData but for the tasks

  return {
    userData,
    tasksData,
  };
};
```

---

# Actions

- Whatever data is sent to the action, They should be treated as formData
- Actions should return something (even if it's null)

```
// submit({ name, img }, { method: "PUT"});

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    name: data.get("name"),
    img: data.get("img"),
  };

  console.log(userData);

  const response = await fetch(
    "https://test-project-e1028-default-rtdb.firebaseio.com/user.json",
    {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return null;
  // console.log(response);
}
```

---

# Form (router)

- They will not work if you added to them onSUbmit={formHandler}
  - By doing this they will not send their data automatically to the action

```
// Will not work
<Form onSubmit={formHandler} method={"post} action={"/home} />
...
</Form>
```

---

# AnimatePresence

- When using it with modals
- It should be written like this

```
<AnimatePresence>
  {openModal && (
    <AddProjectModal
      closeModalHandler={closeProjectModal}
      method="post"
      key="a"
    />
  )}
</AnimatePresence>
```

- not like this

```
<AnimatePresence>
  {openModal && (
    ReactDom.createPortal(..., document....)
  )}
</AnimatePresence>
```

- ReactDom.createPortal() should be made in the component itself (look at addProjectModal.js)