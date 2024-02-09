
const  Loader=() =>{
  return (
    <section className="loader">
      <div></div>
    </section>
  );

}
interface SkeletonProps{
  width?: string;
  length?: number;
}
export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeleton = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
    
  ));

  return <div className='skeleton-loader' style={{ width }}>
    
      {skeleton}
    
   </div>
}


export default Loader