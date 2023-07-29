import axios from "axios"


 const getAllProducts = async(url:string) => {

  const token = localStorage.getItem('token')?.split(' ')[1]


  const config = {
    headers:{
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzN2QxYzk0MS0zOTNhLTQwNmItOGZlNi1jYTZhMjE0N2RhZjAiLCJwZXJtaXNzaW9ucyI6W3siaWQiOiJiOTJlYTgzYy04NzFiLTQzYmUtYTIwNS03MjM4YWU1Y2Y0OTkiLCJuYW1lIjoiYWRoZWFydF9nZXQiLCJkZXNjcmlwdGlvbiI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjMtMDEtMTVUMTQ6NDU6NTMuOTcwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTAxLTE1VDE0OjQ1OjUzLjk3MFoifSx7ImlkIjoiZTg4ZWQwZGMtNjlhMy00NTAzLWFiOWQtMWNlY2IyOTc4MWY2IiwibmFtZSI6InByb2R1Y3RzX2dldCIsImRlc2NyaXB0aW9uIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0xNVQxNDo0NTo1My45NzBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDEtMTVUMTQ6NDU6NTMuOTcwWiJ9XSwiaWF0IjoxNjczOTg5OTA5LCJleHAiOjE2NzM5OTA4MDl9.q2e32dNC73OML-_HowtzZfHwCl2YRs_6EhsBKAb7cBM`
    }
  }

  const response = await axios.get(url,config)


  return response

}

export default getAllProducts