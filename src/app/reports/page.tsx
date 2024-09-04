import { HorizontalBarChart } from "@/components/charts/HorizontalBar";

export default  function Reports() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>
      <HorizontalBarChart />
    </div>    
  )
}