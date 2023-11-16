import Categories from '@components/Categories'
import NavBar from '@components/NavBar'
import Title from '@components/Title'

export default function CategoriesPage() {
  return (
    <>
      <NavBar />
      <Title title={'Categories'} />
      <Categories allCategories={true} />
    </>
  )
}
