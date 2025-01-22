import { useState } from "react";

function To_do() {
  // -- States
  const [todos, setTodos] = useState([]);


  // -- Events
  function gererSubmit(e) {
    // Annule le comportement par défaut
    e.preventDefault();
    // Recherche la donnée
    const titre = e.target.titre.value;
    // Ajouter le todo à la liste
    const nouveauTodo = {
      id: crypto.randomUUID(),
      titre,
      estFini: false, 
    };
    // setTodos((prev) => {
    //   // // Création d'une copie pour avoir une nouvelle référence
    //   // const nouveauTableau = [...prev];
    //   // nouveauTableau.push(nouveauTodo);
    //   // return nouveauTableau;
    //   return [
    //     ...prev, 
    //     nouveauTodo,
    //   ];
    // });
    setTodos((prev) => ([...prev, nouveauTodo]));
    // Vide le formulaire
    e.target.reset();
  }
  function gererSuppression(todoId) {
    // setTodos((prev) => {
    //   // // Retrouve l'index du todo dans la state
    //   // const position = prev.findIndex((todo) => (todo.id === todoId));
    //   // // Supprime le todo de la state
    //   // prev.splice(position, 1);
    //   // // Retourne une copie de la state mise-à-jour
    //   // return [...prev];
    //   // return prev.filter((todo) => (todo.id != todoId));
    //   return prev.filter(({ id }) => (id != todoId));
    // });
    setTodos((prev) => (prev.filter(({ id }) => (id != todoId))))
  }


  function gererStatut(todoId) {
    setTodos((prev) => {
      // Recherche du bon todo
      const todo = prev.find(({ id }) => (id === todoId));
      // Met à jour son état
      todo.estFini = !todo.estFini;
      // Renvoyer une copie de la liste des todos
      return [...prev];
    })


    // setTodos((prev) => ([
    //   ...prev.map((todo) => {
    //     if (todo.id != todoId) return todo
    //     return {
    //       ...todo,
    //       estFini: !todo.estFini,
    //     }
    //   })
    // ]))
  }


  // -- Render
  return (
    <main>
      {/* Formulaire d'ajout */}
      <form onSubmit={gererSubmit}>
        <input type="text" name="titre" />
        <button type="submit">Ajouter</button>
      </form>


      <hr />
      {/* Liste des todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {/* {todo.estFini ? '[Fait] ' : '[À faire] '} */}
            {/* Statut */}
            <input type="checkbox" checked={todo.estFini} disabled />
            {/* Titre */}
            {todo.titre}
            {/* suppression */}
            <button onClick={() => gererSuppression(todo.id)}>supprimer</button>
            {/* Changement statut */}
            <button onClick={() => gererStatut(todo.id)}>changer statut</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default To_do;