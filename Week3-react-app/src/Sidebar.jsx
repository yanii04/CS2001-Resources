import Registration from './Registration.jsx'

function Sidebar() {

  return (
    <>
        <main>
            <aside>
                 <input type="text" class="search" id="search" name="search" placeholder="Search"/><br></br>
            </aside>
            <Registration />
        </main>
    </>
  )
}

export default Sidebar
