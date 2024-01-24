import Button from "../components/Button"

const Hero = () => {
  return (
    <section className="w-full border-2 border-red-500 h-20 flex
    xl:flex-row flex-col justify-center items-center min-h-screen p-2 gap-10 max-container">
        <div className="relative xl:w-2/5 flex flex-col justify-center items_start max-xl:padding-x pt-28 w-full ">
          <p>Our Summer collections</p>
          <h1><span>The New Arrival</span> <br/><span>Nike</span> Shoes</h1>
          <p>Discover stylish Nike arrivals, quality comfort, and innovation for your active life.</p>
          <Button className='bg-red-500 text-white  ' label='Shop now' ></Button>
        </div>
    </section>
  )
}

export default Hero